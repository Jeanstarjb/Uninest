from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, PropertyListing, RoommateProfile

admin.site.register(User, UserAdmin)
admin.site.register(PropertyListing)
admin.site.register(RoommateProfile)
