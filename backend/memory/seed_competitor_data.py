"""3-month simulated competitor history used for the demo."""

SEED_SIGNALS = [
    {"source": "pricing-page", "competitor": "Competitor A", "category": "pricing",
     "headline": "A cut prices 30% and launched a free tier",
     "content": "Competitor A cut Pro from $49 to $34/mo and launched a free tier in August."},
    {"source": "status-page", "competitor": "Competitor A", "category": "reliability",
     "headline": "A suffered 4 major outages after the price cut",
     "content": "Competitor A had 4 major outages in 6 weeks after the price cut; uptime fell to 99.1%."},
    {"source": "sales-calls", "competitor": "Competitor A", "category": "customer-sentiment",
     "headline": "Prospects churn from A over unresponsive support",
     "content": "Three prospects reported leaving Competitor A due to no phone support and week-long ticket delays."},
    {"source": "linkedin-jobs", "competitor": "Competitor B", "category": "hiring",
     "headline": "B hired 10 enterprise reps in EMEA",
     "content": "Competitor B posted 10 enterprise sales roles in EMEA and announced SOC2 + native Slack integration."},
    {"source": "lost-deal-review", "competitor": "Competitor B", "category": "win-loss",
     "headline": "We lost 3 enterprise deals to B on compliance",
     "content": "Three enterprise deals were lost to Competitor B because they have SOC2 and we do not."},
    {"source": "history", "competitor": "Competitor B", "category": "pricing",
     "headline": "B ran the same promo 6 months ago and raised prices 60 days later",
     "content": "Competitor B discounted 30% six months ago, then raised prices 60 days later. Promos are temporary."},
]
