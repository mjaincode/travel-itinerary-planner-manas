from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Travel Itinerary Planner API is running!"}

@app.post("/generate-itinerary")
def generate_itinerary(data: dict):
    destination = data.get("destination", "Unknown")
    budget = data.get("budget", "Not specified")
    duration = data.get("duration", 3)
    interests = data.get("interests", [])

    interests_text = ", ".join(interests) if interests else "general sightseeing"

    itinerary = f"""
    🎯 Personalized Trip to {destination}
    
    📅 Duration: {duration} days
    💰 Budget: {budget}
    🎯 Interests: {interests_text}
    
    Day 1: Arrive in {destination}. Check into hotel and explore the local market.
    Day 2: Visit top attractions based on your interests: {interests_text}.
    Day 3: Enjoy local cuisine, shopping, and depart.
    
    Have a stress-free getaway! ✈️
    """.strip()

    return {"itinerary": itinerary}
