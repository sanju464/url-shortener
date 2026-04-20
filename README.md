# 📡 Coursework Alert System – Automated Assignment Monitoring

## 🚀 Overview

Coursework Alert System is an automated tool that monitors academic platforms (e.g., ETLab) for new assignments or updates and sends notifications to users.

It ensures students never miss important coursework deadlines.

---

## 🎯 Problem

Students often miss assignment updates due to:

* Manual checking of portals
* Lack of real-time notifications
* Frequent updates across multiple subjects

---

## ⚙️ System Design

```text
Platform (ETLab)
      ↓
Data Fetcher (scraper / API)
      ↓
Change Detection (hash comparison)
      ↓
Update Trigger
      ↓
Notification System
  - Email alerts
  - Google Calendar integration
```

---

## 🧠 Key Features

### 🔹 Automated Monitoring

Continuously checks for new assignments or updates.

### 🔹 Change Detection

Uses hashing to detect changes efficiently and avoid duplicate alerts.

### 🔹 Notification System

* Sends email alerts
* Optional calendar integration for reminders

### 🔹 Lightweight & Efficient

Designed to run periodically with minimal resource usage.

---

## 🛠️ Tech Stack

* Python / JavaScript *(update based on your repo)*
* Email APIs / SMTP
* Scheduling (cron / timers)
* Hash-based comparison logic

---

## ▶️ How It Works

1. Fetch assignment data from platform
2. Compute hash of current state
3. Compare with previous state
4. If changed → trigger notification

---

## 📊 Example

```text
New Assignment Detected:
Subject: Data Structures
Deadline: 25 Feb
Action: Email + Calendar Event Created
```

---

## 📌 Future Improvements

* Web dashboard for tracking assignments
* Multi-platform support
* Push notifications (mobile)
* User authentication & personalization

---

## 🤝 Why This Project Matters

* Demonstrates real-world automation
* Shows system design thinking
* Practical utility for students

---

## 📎 Author

Sanju – Developer focused on automation and intelligent systems
