from core.models import RoommateProfile
from decimal import Decimal

def calculate_compatibility_score(user_profile, potential_matches):
    """
    Calculates a compatibility score between the user and potential matches.
    """
    results = []

    user_budget = user_profile.budget_max
    
    for match in potential_matches:
        if match.id == user_profile.id:
            continue
            
        # Budget Check
        budget_diff = abs(user_budget - match.budget_max)
        budget_diff_percentage = budget_diff / user_budget if user_budget > 0 else 0
        
        # Strict filter: if budget mismatch > 25%, discard
        if budget_diff_percentage > Decimal('0.25'):
            continue
            
        # Scoring components
        score = 100.0
        
        # 1. Cleanliness (weight: 40% -> max penalty 40 points)
        # Max difference is 4 (5 - 1). Each point difference = 10% penalty
        clean_diff = abs(user_profile.cleanliness_level - match.cleanliness_level)
        clean_penalty = clean_diff * 10
        score -= clean_penalty
        
        # 2. Guest Tolerance (weight: 40% -> max penalty 40 points)
        # Max difference is 4. Each point difference = 10% penalty
        guest_diff = abs(user_profile.guest_tolerance - match.guest_tolerance)
        guest_penalty = guest_diff * 10
        score -= guest_penalty
        
        # 3. Study Hours (weight: 20% -> max penalty 20 points)
        if user_profile.study_hours == match.study_hours:
            study_penalty = 0
        elif 'Mixed' in [user_profile.study_hours, match.study_hours]:
            study_penalty = 10  # Partial match
        else:
            study_penalty = 20  # Total mismatch (Early Bird vs Night Owl)
            
        score -= study_penalty
        
        # High penalty for budget mismatch within the 25% allowed range
        # E.g., 20% diff -> 20 points penalty
        budget_penalty = float(budget_diff_percentage * 100)
        score -= budget_penalty
        
        # Ensure score is within 0-100
        final_score = max(0.0, min(100.0, score))
        
        match_data = {
            'id': match.id,
            'student_id': match.student.id,
            'username': match.student.username,
            'student_registration_number': match.student.student_registration_number,
            'university_name': match.student.university_name,
            'budget_max': match.budget_max,
            'cleanliness_level': match.cleanliness_level,
            'guest_tolerance': match.guest_tolerance,
            'study_hours': match.study_hours,
            'bio': match.bio,
            'match_percentage': round(final_score, 1)
        }
        results.append(match_data)
        
    # Sort from highest to lowest
    results.sort(key=lambda x: x['match_percentage'], reverse=True)
    return results
