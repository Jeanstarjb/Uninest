from rest_framework import serializers
from .models import User, PropertyListing, RoommateProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'student_registration_number', 'university_name']

class PropertyListingSerializer(serializers.ModelSerializer):
    landlord_details = UserSerializer(source='landlord', read_only=True)

    class Meta:
        model = PropertyListing
        fields = ['id', 'landlord', 'landlord_details', 'title', 'rent_amount', 'location', 'amenities', 'is_verified']
        read_only_fields = ['is_verified']

class RoommateProfileSerializer(serializers.ModelSerializer):
    student_details = UserSerializer(source='student', read_only=True)

    class Meta:
        model = RoommateProfile
        fields = ['id', 'student', 'student_details', 'budget_max', 'cleanliness_level', 'study_hours', 'guest_tolerance', 'bio']
