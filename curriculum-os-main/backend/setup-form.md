# CurriculumOS Setup Form

Use this form to gather learner preferences before generating a curriculum.

```json
{
  "setup": {
    "learner_info": {
      "name": "",
      "email": ""
    },
    "learning_preferences": {
      "topic": "",
      "current_level": "beginner | intermediate | advanced | expert",
      "years_of_experience": 0,
      "learning_goals": [],
      "available_hours_per_week": 5,
      "total_hours_budget": 20,
      "preferred_learning_style": "project-based | theory-first | balanced",
      "preferred_formats": ["video", "article", "course", "interactive", "paper", "code"],
      "constraints": [],
      "language": "en"
    },
    "technical_setup": {
      "api_key_provided": false,
      "target_platform": "claude | api | standalone | openclaw",
      "export_format": "json | markdown | csv"
    }
  }
}
```

## Learner Profile Questionnaire

Ask the learner these questions:

1. **What do you want to learn?** (topic)
2. **What's your current level?** (beginner / intermediate / advanced / expert)
3. **What's your background?** (relevant experience, skills, education)
4. **What are your specific goals?** (what do you want to be able to do?)
5. **How much time do you have?** (total hours available)
6. **How do you learn best?** (project-based / theory-first / balanced)
7. **What formats do you prefer?** (videos, articles, courses, interactive, papers, code)
8. **Any constraints?** (time limits, tech requirements, accessibility needs)
9. **What language should the curriculum be in?** (default: English)
