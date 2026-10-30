from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# CORS: frontend se request aane de
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class TripRequest(BaseModel):
    destination: str
    budget: str
    duration: int
    interests: List[str]

@app.get("/")
def home():
    return {"message": "Travel Itinerary Planner API is running!"}

@app.post("/generate-itinerary")
def generate_itinerary(req: TripRequest):
    # Ye simple mock response hai. Baad mein real AI connect karna.
    interests_text = ", ".join(req.interests) if req.interests else "general sightseeing"
    
    itinerary = f"""
    🎯 Personalized Trip to {req.destination}
    
    📅 Duration: {req.duration} days
    💰 Budget: {req.budget}
    🎯 Interests: {interests_text}
    
    Day 1: Arrive in {req.destination}. Check into hotel and explore the local market.
    Day 2: Visit top attractions based on your interests: {interests_text}.
    Day 3: Enjoy local cuisine, shopping, and depart.
    
    Have a stress-free getaway! ✈️
    """.strip()

    return {"itinerary": itinerary}