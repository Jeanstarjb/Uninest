import os
import django
import sys

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from core.models import PropertyListing, RoommateProfile

User = get_user_model()

def seed_database():
    print("Seeding database...")
    
    # Create a Landlord User
    landlord, created = User.objects.get_or_create(
        username='dummy_landlord',
        defaults={'email': 'landlord@uninest.com', 'role': 'Landlord'}
    )
    if created:
        landlord.set_password('password123')
        landlord.save()

    # Properties Data
    properties_data = [
        {'title': 'Qwanza Student Apartments (1BR)', 'location': 'KM, Kenyatta University', 'rent_amount': 12500.00, 'amenities': ['WIFI', 'CCTV', 'Hot Shower']},
        {'title': 'Kahawa Wendani Bedsitters', 'location': 'Kahawa Wendani', 'rent_amount': 8500.00, 'amenities': ['WIFI', 'Water 24/7']},
        {'title': 'Ruiru Town Studio', 'location': 'Ruiru', 'rent_amount': 10500.00, 'amenities': ['CCTV', 'Security']},
        {'title': 'Premium Hostel near KM', 'location': 'KM, Kenyatta University', 'rent_amount': 15000.00, 'amenities': ['WIFI', 'Meals', 'Laundry']},
        {'title': 'Spacious 2BR for Sharing', 'location': 'Ruiru', 'rent_amount': 25000.00, 'amenities': ['WIFI', 'Balcony', 'Parking']}
    ]

    print("Creating Properties...")
    for prop_data in properties_data:
        PropertyListing.objects.get_or_create(
            title=prop_data['title'],
            defaults={
                'landlord': landlord,
                'location': prop_data['location'],
                'rent_amount': prop_data['rent_amount'],
                'amenities': prop_data['amenities'],
                'is_verified': True
            }
        )

    # Roommates Data
    roommates_data = [
        {'username': 'Teddy Nyikuli', 'university': 'Kenyatta University (KU)', 'budget': 10000.00, 'clean': 4, 'study': 'Night Owl', 'guest': 3},
        {'username': 'Bornventure Odhiambo', 'university': 'Jomo Kenyatta University of Agriculture and Technology (JKUAT)', 'budget': 12000.00, 'clean': 5, 'study': 'Early Bird', 'guest': 2},
        {'username': 'Felistar Mwaniki', 'university': 'University of Nairobi (UoN)', 'budget': 15000.00, 'clean': 3, 'study': 'Mixed', 'guest': 4},
        {'username': 'Brenda Kiago', 'university': 'Strathmore University', 'budget': 20000.00, 'clean': 5, 'study': 'Night Owl', 'guest': 1},
        {'username': 'Dennis Musyoki', 'university': 'Kenyatta University (KU)', 'budget': 11000.00, 'clean': 4, 'study': 'Early Bird', 'guest': 3}
    ]

    print("Creating Roommates...")
    for rm_data in roommates_data:
        # Create user first
        user_name = rm_data['username'].replace(" ", "").lower()
        student, created = User.objects.get_or_create(
            username=user_name,
            defaults={
                'email': f'{user_name}@students.ac.ke',
                'role': 'Student',
                'university_name': rm_data['university'],
                'first_name': rm_data['username'].split()[0],
                'last_name': rm_data['username'].split()[1] if len(rm_data['username'].split()) > 1 else ''
            }
        )
        if created:
            student.set_password('password123')
            student.save()

        # Create Profile
        RoommateProfile.objects.get_or_create(
            student=student,
            defaults={
                'budget_max': rm_data['budget'],
                'cleanliness_level': rm_data['clean'],
                'study_hours': rm_data['study'],
                'guest_tolerance': rm_data['guest'],
                'bio': f"Hi, I am {rm_data['username']} looking for a roommate!"
            }
        )

    print("Database seeded successfully with dummy data!")

if __name__ == '__main__':
    seed_database()
