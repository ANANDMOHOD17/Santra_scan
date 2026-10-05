import pytest
import io
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root_and_health():
    res = client.get("/")
    assert res.status_code == 200
    data = res.json()
    assert data["app"] == "SantraScan API"
    assert "Nagpur RISE" in data["cohort"]

    res_h = client.get("/api/health")
    assert res_h.status_code == 200
    h_data = res_h.json()
    assert h_data["status"] == "healthy"
    assert "ai_vision_model" in h_data["components"]

def test_demo_users_and_auth():
    res = client.get("/api/auth/demo-users")
    assert res.status_code == 200
    users = res.json()
    assert len(users) >= 4
    roles = [u["role"] for u in users]
    assert "operator" in roles
    assert "reviewer" in roles

    # Login as operator
    login_res = client.post("/api/auth/login", json={"username": "operator", "password": "operator123"})
    assert login_res.status_code == 200
    token_data = login_res.json()
    assert "access_token" in token_data
    assert token_data["user"]["role"] == "operator"

def test_orange_book_endpoints():
    # Articles
    res = client.get("/api/orange-book/articles")
    assert res.status_code == 200
    articles = res.json()
    assert len(articles) > 0

    # Specific slug
    slug = articles[0]["slug"]
    detail_res = client.get(f"/api/orange-book/articles/{slug}")
    assert detail_res.status_code == 200
    assert "source_attribution" in detail_res.json()

    # 2D Tree anatomy
    anatomy_res = client.get("/api/orange-book/tree-anatomy")
    assert anatomy_res.status_code == 200
    anatomy = anatomy_res.json()
    anatomy_ids = [part["id"] for part in anatomy]
    assert "graft_union" in anatomy_ids
    assert "leaves" in anatomy_ids
    assert "roots" in anatomy_ids

    # Seasonal calendar
    cal_res = client.get("/api/orange-book/seasonal-calendar")
    assert cal_res.status_code == 200
    cal = cal_res.json()
    assert len(cal) >= 8

def test_scan_history_and_analytics():
    res = client.get("/api/scans")
    assert res.status_code == 200
    scans = res.json()
    assert len(scans) > 0

    analytics_res = client.get("/api/analytics/dashboard")
    assert analytics_res.status_code == 200
    stats = analytics_res.json()
    assert "total_scans" in stats["summary"]
    assert stats["summary"]["total_scans"] > 0

def test_plant_passport_and_survival():
    res = client.get("/api/passports/PSP-NGP-77421")
    assert res.status_code == 200
    passport = res.json()
    assert passport["verdict"] == "suitable"
    assert passport["nursery_name"] != ""

    # Farmer survival log
    log_res = client.post("/api/passports/PSP-NGP-77421/survival", json={
        "farmer_name": "Test Farmer",
        "status": "alive",
        "days_since_planting": 60,
        "orchard_location": "Katol",
        "notes": "Healthy growth"
    })
    assert log_res.status_code == 200
    assert log_res.json()["current_survival_status"] == "alive"

def test_review_queue():
    res = client.get("/api/reviews/queue")
    assert res.status_code == 200
    queue = res.json()
    assert isinstance(queue, list)
