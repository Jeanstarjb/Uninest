from django.urls import path
from .views import PropertyListingListCreateView, RoommateMatchView

urlpatterns = [
    path('properties/', PropertyListingListCreateView.as_view(), name='property-list-create'),
    path('roommates/match/', RoommateMatchView.as_view(), name='roommate-match'),
]
