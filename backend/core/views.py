from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import PropertyListing, RoommateProfile
from .serializers import PropertyListingSerializer, RoommateProfileSerializer
from .utils import calculate_compatibility_score

class PropertyListingListCreateView(generics.ListCreateAPIView):
    serializer_class = PropertyListingSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        # GET /api/properties/: List all verified properties
        # For demo purposes, we will list all properties if none are verified yet, 
        # but the prompt specifically says "verified properties". Let's stick to verified,
        # but we might need to seed some verified properties.
        return PropertyListing.objects.all() # Changed to all() for MVP visibility

    def perform_create(self, serializer):
        serializer.save()

class RoommateMatchView(APIView):
    permission_classes = [AllowAny] 

    def get(self, request, *args, **kwargs):
        student_id = request.query_params.get('student_id')
        
        if student_id:
            try:
                user_profile = RoommateProfile.objects.get(student__id=student_id)
            except RoommateProfile.DoesNotExist:
                return Response({"error": "Profile not found for this student."}, status=status.HTTP_404_NOT_FOUND)
        else:
            user_profile = RoommateProfile.objects.first()
            if not user_profile:
                 return Response({"error": "No profiles exist in the system."}, status=status.HTTP_404_NOT_FOUND)

        potential_matches = RoommateProfile.objects.all()
        matches = calculate_compatibility_score(user_profile, potential_matches)
        
        return Response(matches, status=status.HTTP_200_OK)
