from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('Student', 'Student'),
        ('Landlord', 'Landlord'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Student')
    UNIVERSITY_CHOICES = (
        ('Kenyatta University (KU)', 'Kenyatta University (KU)'),
        ('Jomo Kenyatta University of Agriculture and Technology (JKUAT)', 'Jomo Kenyatta University of Agriculture and Technology (JKUAT)'),
        ('University of Nairobi (UoN)', 'University of Nairobi (UoN)'),
        ('Strathmore University', 'Strathmore University'),
        ('United States International University (USIU)', 'United States International University (USIU)'),
    )
    student_registration_number = models.CharField(max_length=50, blank=True, null=True)
    university_name = models.CharField(max_length=100, choices=UNIVERSITY_CHOICES, blank=True, null=True)
class PropertyListing(models.Model):
    landlord = models.ForeignKey(User, on_delete=models.CASCADE, related_name='properties')
    title = models.CharField(max_length=200)
    rent_amount = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)
    amenities = models.JSONField(default=list, blank=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title} - {self.location}"

class RoommateProfile(models.Model):
    STUDY_HOURS_CHOICES = (
        ('Early Bird', 'Early Bird'),
        ('Night Owl', 'Night Owl'),
        ('Mixed', 'Mixed'),
    )
    student = models.OneToOneField(User, on_delete=models.CASCADE, related_name='roommate_profile')
    budget_max = models.DecimalField(max_digits=10, decimal_places=2)
    cleanliness_level = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    study_hours = models.CharField(max_length=20, choices=STUDY_HOURS_CHOICES)
    guest_tolerance = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    bio = models.TextField(blank=True)

    def __str__(self):
        return f"Profile for {self.student.username}"
