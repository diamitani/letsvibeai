FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends gcc && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml ./
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir "fastapi>=0.104.0" "uvicorn[standard]>=0.24.0" "pydantic>=2.5.0" "requests>=2.31.0" "python-dotenv>=1.0.0" PyJWT boto3 mangum "pydantic[email]"

COPY . .

RUN pip install --no-cache-dir -e . 2>/dev/null || true

EXPOSE 8000

CMD ["python", "-m", "uvicorn", "src.curriculum_agent.main:app", "--host", "0.0.0.0", "--port", "8000"]
