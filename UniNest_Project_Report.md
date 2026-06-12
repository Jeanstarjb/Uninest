# UniNest - A Database-Driven Student Accommodation & Roommate Matching System

**Course:** SCO 207 Group Project Assignment
**Submission Date:** 25th May 2026


## 2. Introduction

### Problem Definition

The landscape of off-campus student accommodation around major Kenyan universities, particularly in areas such as KM (Kenyatta Market) and Ruiru, is characterized by significant disorganization and a pervasive lack of verified information. Students seeking housing are often subjected to fragmented communication channels, relying heavily on word-of-mouth, unregulated social media groups, or localized physical notices. This chaotic environment frequently results in exposure to fraudulent listings, severe price asymmetry, and suboptimal living conditions, exacerbating the already stressful transition into university life. 

Furthermore, the process of securing a compatible roommate remains largely reliant on blind luck rather than empirical compatibility. Without a formalized digital matchmaking infrastructure, students often cohabitate with individuals whose lifestyle preferences—such as study hours, cleanliness standards, and guest tolerances—are fundamentally misaligned. These incompatibilities inevitably lead to interpersonal conflicts, reduced academic performance, and premature termination of leases, imposing both financial and psychological burdens on the student populace.

The UniNest system seeks to address these compounded issues by introducing a centralized, database-driven platform. By digitizing and verifying property listings while simultaneously employing an empirical compatibility algorithm for roommate matchmaking, the system aims to introduce transparency, security, and data-driven predictability into the Kenyan university student housing ecosystem.

### Objectives of the System

*   **Centralize Property Listings:** To develop a secure database of verified off-campus rental properties tailored specifically for the student demographic.
*   **Automate Roommate Matchmaking:** To implement an intelligent scoring algorithm that evaluates user preferences to pair students with highly compatible roommates.
*   **Enhance User Security:** To eliminate fraudulent housing practices by ensuring all listed properties and landlords undergo a verification process.
*   **Streamline the Search Process:** To provide an intuitive, responsive user interface that drastically reduces the time and effort required for students to secure suitable accommodation.

---

## 3. System Design

[Insert User Interface design screenshots here - Use Antigravity to capture the UI states]

### Algorithms and Methods: Roommate Compatibility Scoring Algorithm

The core of the UniNest roommate matching feature is powered by a weighted compatibility algorithm. The system calculates the absolute differences between integer-based user preferences and applies specific weights to generate a final percentage match. 

**Pseudocode for Compatibility Algorithm:**

```text
ALGORITHM CalculateCompatibility
INPUT: UserProfile (U), List of Potential Matches (M)
OUTPUT: Sorted List of Match Objects with Percentage Scores

BEGIN
    Initialize ResultsList as empty list
    UserBudget = U.budget_max

    FOR EACH MatchProfile (P) IN M:
        IF P.id == U.id THEN
            CONTINUE // Skip self
        END IF

        // 1. Budget Constraint Check (Strict Filter)
        BudgetDifference = ABS(UserBudget - P.budget_max)
        BudgetDiffPercentage = BudgetDifference / UserBudget
        IF BudgetDiffPercentage > 0.25 THEN
            CONTINUE // Discard match if budget difference exceeds 25%
        END IF

        // 2. Initialize Base Score
        BaseScore = 100.0

        // 3. Cleanliness Penalty (Weight: 40%)
        // Scale 1-5. Max diff is 4. Each point diff = 10% penalty
        CleanlinessDiff = ABS(U.cleanliness_level - P.cleanliness_level)
        CleanlinessPenalty = CleanlinessDiff * 10
        BaseScore = BaseScore - CleanlinessPenalty

        // 4. Guest Tolerance Penalty (Weight: 40%)
        // Scale 1-5. Max diff is 4. Each point diff = 10% penalty
        GuestDiff = ABS(U.guest_tolerance - P.guest_tolerance)
        GuestPenalty = GuestDiff * 10
        BaseScore = BaseScore - GuestPenalty

        // 5. Study Hours Penalty (Weight: 20%)
        // Categorical: 'Early Bird', 'Night Owl', 'Mixed'
        IF U.study_hours == P.study_hours THEN
            StudyPenalty = 0
        ELSE IF 'Mixed' IN [U.study_hours, P.study_hours] THEN
            StudyPenalty = 10
        ELSE
            StudyPenalty = 20
        END IF
        BaseScore = BaseScore - StudyPenalty

        // 6. Budget Mismatch Penalty
        // Deduct points corresponding to the percentage difference (e.g., 20% diff = 20 points)
        BudgetPenalty = BudgetDiffPercentage * 100
        BaseScore = BaseScore - BudgetPenalty

        // 7. Final Score Normalization
        FinalScore = MAX(0.0, MIN(100.0, BaseScore))

        // 8. Construct Match Result
        MatchResult = CreateObject(P, FinalScore)
        APPEND MatchResult TO ResultsList
    END FOR

    SORT ResultsList DESCENDING by FinalScore
    RETURN ResultsList
END
```

---

## 4. Implementation

### Tools and Technologies Used

*   **Frontend (React & Tailwind CSS):** React was selected for its component-based architecture, which allows for the rapid development of dynamic, single-page application (SPA) interfaces. This ensures the application remains highly responsive without requiring page reloads. Tailwind CSS was utilized to implement a modern, constrained design system directly within the markup, accelerating styling while maintaining a consistent visual identity.
*   **Backend (Django & Django REST Framework):** Django provides a robust, highly secure Python framework that perfectly aligns with the principles of rapid development. The Django REST Framework (DRF) was used to construct stateless API endpoints, effectively decoupling the backend logic from the frontend presentation layer.
*   **Database (SQLite):** For the initial MVP phase, SQLite was employed as the relational database management system. It provides sufficient adherence to relational principles (ACID compliance) required for structured data like user models and property listings, while minimizing configuration overhead during the prototyping phase.

### Key Code Snippets

**Snippet 1: Roommate Profile Database Model**

```python
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
```
*Academic Explanation:* This Django model utilizes an Object-Relational Mapping (ORM) approach to define the schema for roommate preferences. The `OneToOneField` enforces a strict database constraint ensuring each student possesses exactly one profile.

**Snippet 2: Compatibility Calculation Logic**

```python
# Extract from calculate_compatibility_score utility
clean_diff = abs(user_profile.cleanliness_level - match.cleanliness_level)
clean_penalty = clean_diff * 10
score -= clean_penalty

guest_diff = abs(user_profile.guest_tolerance - match.guest_tolerance)
guest_penalty = guest_diff * 10
score -= guest_penalty
```
*Academic Explanation:* This Python logic implements the numerical penalty deduction based on absolute differences in user preferences. By utilizing standard absolute value functions, the algorithm ensures that deviations in either direction (e.g., being much cleaner or much messier than the prospective match) incur symmetrical penalties.

---

## 5. Results

[Insert Screenshots of the running system here: The Single-Page Registration Form, Available Properties Dashboard, and Your Best Matches Results]

### Description of System Functionality

The UniNest application delivers a seamless, linear user journey specifically tailored for the university demographic. The interaction begins at the **Registration Interface**, a secure, single-page component where students input their demographic details alongside a strictly validated University Registration Number (e.g., S13/12345/23). This validation ensures that the ecosystem remains exclusive to verified academics.

Upon successful authentication, the user is redirected to the **Available Properties Dashboard**. This view executes a GET request to the backend API, populating the interface with verified housing listings in proximity to major campuses (e.g., KM, Ruiru). Each listing clearly displays essential metrics such as amenities, localized rental costs in Kenyan Shillings (Ksh), and landlord contact information.

For users seeking cohabitation, the **Roommate Matcher** functionality calculates and displays algorithmic matches. The system processes the student's predefined lifestyle variables against the database, filtering out candidates exceeding a 25% budget differential. The resulting dashboard presents potential roommates in descending order of compatibility, utilizing color-coded progress bars (green, yellow, red) to visually communicate the strength of the algorithmic match, ultimately empowering students to make data-driven housing decisions.

---

## 6. References

Django Software Foundation. (2024). *Django Documentation*. Retrieved from https://docs.djangoproject.com/

Elmasri, R., & Navathe, S. B. (2015). *Fundamentals of Database Systems* (7th ed.). Pearson.

Meta Platforms, Inc. (2024). *React Documentation: A JavaScript library for building user interfaces*. Retrieved from https://react.dev/

Russell, S. J., & Norvig, P. (2021). *Artificial Intelligence: A Modern Approach* (4th ed.). Pearson.
