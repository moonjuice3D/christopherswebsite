// projects.js

const projects = [
  {
    slug: "fin-viz-dashboard",
    name: "Fin-Viz Dashboard",
    category: "FinTech",
    description:
      "Full-stack financial data visualization dashboard for stocks and crypto.",
    techStack: ["React", "Node.js", "MongoDB"],
    demoPath: "/demo/fin-viz",
    api: {
      summaryEndpoint: "/api/finviz/summary"
    }
  },
  {
    slug: "ai-stock-prediction",
    name: "AI Stock Prediction Model",
    category: "AI/ML",
    description:
      "Python-based ML model predicting volatility from historical data and sentiment.",
    techStack: ["Python", "TensorFlow", "AWS"],
    api: {
      predictEndpoint: "/api/ai/stock-prediction"
    }
  },
  {
    slug: "low-latency-trading",
    name: "Low-Latency Trading System",
    category: "Trading Systems",
    description:
      "Backend for a simulated low-latency trading platform using Java and C++.",
    techStack: ["Java", "C++", "Kafka"],
    api: {
      // stub – you can build this later
      statusEndpoint: "/api/trading/status"
    }
  },
  {
    slug: "blockchain-payment-gateway",
    name: "Blockchain Payment Gateway",
    category: "Web3",
    description:
      "Ethereum-based payment processing system with Node.js backend.",
    techStack: ["Solidity", "React", "Web3.js"],
    api: {
      statusEndpoint: "/api/blockchain/status"
    }
  },
  {
    slug: "cloud-migration-toolkit",
    name: "Cloud Migration Toolkit",
    category: "Cloud",
    description:
      "Automated helper for migrating workloads to AWS with cost hints.",
    techStack: ["Python", "AWS CDK", "Terraform"],
    api: {
      estimateEndpoint: "/api/cloud-migration/estimate"
    }
  },
  {
    slug: "realtime-chat-app",
    name: "Real-time Chat Application",
    category: "Communication",
    description:
      "Simple chat backend with rooms and message persistence in memory.",
    techStack: ["Node.js", "Vue.js", "Socket.io (future)"],
    api: {
      messagesEndpoint: "/api/chat/messages"
    }
  },
  {
    slug: "mlops-pipeline",
    name: "MLOps Pipeline Framework",
    category: "MLOps",
    description:
      "Conceptual MLOps framework for training + deployment + monitoring.",
    techStack: ["Kubernetes", "MLflow", "Prometheus"],
    api: {
      statusEndpoint: "/api/mlops/status"
    }
  },
  {
    slug: "iot-device-management",
    name: "IoT Device Management",
    category: "IoT",
    description:
      "Mock IoT device registry and status API.",
    techStack: ["Go", "MQTT", "TimescaleDB"],
    api: {
      devicesEndpoint: "/api/iot/devices"
    }
  },
  {
    slug: "computer-vision-api",
    name: "Computer Vision API",
    category: "AI/ML",
    description:
      "RESTful API for image recognition (stubbed in this backend).",
    techStack: ["FastAPI", "PyTorch", "OpenCV"],
    api: {
      classifyEndpoint: "/api/cv/classify"
    }
  },
  {
    slug: "microservices-ecommerce",
    name: "Microservices E-commerce",
    category: "Microservices",
    description:
      "Distributed e-commerce simulation with multiple microservices.",
    techStack: ["Spring Boot", "RabbitMQ", "MongoDB"],
    api: {
      healthEndpoint: "/api/ecommerce/health"
    }
  },
  {
    slug: "data-pipeline-orchestrator",
    name: "Data Pipeline Orchestrator",
    category: "Data Engineering",
    description:
      "Workflow manager mock for ETL jobs.",
    techStack: ["Airflow", "Python", "PostgreSQL"],
    api: {
      pipelinesEndpoint: "/api/pipelines"
    }
  },
  {
    slug: "serverless-image-processor",
    name: "Serverless Image Processor",
    category: "Serverless",
    description:
      "Image resize/thumbnail mock API.",
    techStack: ["AWS Lambda", "S3", "CloudFront"],
    api: {
      processEndpoint: "/api/images/process"
    }
  },
  {
    slug: "portfolio-optimizer",
    name: "Portfolio Optimizer",
    category: "FinTech",
    description:
      "Portfolio optimization demo using simple mean-variance logic.",
    techStack: ["Python/JS", "NumPy-style math"],
    api: {
      optimizeEndpoint: "/api/portfolio/optimize"
    }
  },
  {
    slug: "cicd-automation-suite",
    name: "CI/CD Automation Suite",
    category: "DevOps",
    description:
      "Mock pipeline status and quality gate checks.",
    techStack: ["Jenkins", "Docker", "Kubernetes"],
    api: {
      pipelinesEndpoint: "/api/cicd/pipelines"
    }
  },
  {
    slug: "natural-language-api",
    name: "Natural Language API",
    category: "AI/NLP",
    description:
      "Sentiment and entity analysis demo.",
    techStack: ["Flask", "spaCy", "NLTK"],
    api: {
      sentimentEndpoint: "/api/nlp/sentiment"
    }
  },
  {
    slug: "mobile-fitness-app",
    name: "Mobile Fitness App",
    category: "Mobile",
    description:
      "Mock workout and progress tracker endpoints.",
    techStack: ["React Native", "Firebase", "Redux"],
    api: {
      workoutsEndpoint: "/api/fitness/workouts"
    }
  },
  {
    slug: "distributed-cache-system",
    name: "Distributed Cache System",
    category: "Distributed Systems",
    description:
      "Simple cache get/set/status mock.",
    techStack: ["Go", "Raft", "gRPC"],
    api: {
      statsEndpoint: "/api/cache/stats"
    }
  },
  {
    slug: "ar-navigation-system",
    name: "AR Navigation System",
    category: "AR/VR",
    description:
      "Backend stub for indoor navigation routes.",
    techStack: ["Unity", "ARKit", "C#"],
    api: {
      routesEndpoint: "/api/ar/routes"
    }
  }
];

module.exports = { projects };
