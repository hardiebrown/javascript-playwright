# ✅ Use Playwright’s official Docker image with browsers pre-installed
FROM mcr.microsoft.com/playwright:v1.40.0-focal

# ✅ Set working directory inside the container
WORKDIR /app

# ✅ Copy package.json & package-lock.json first (for caching layers)
COPY package.json package-lock.json ./

# ✅ Install dependencies
RUN npm install

# ✅ Copy the rest of the project files
COPY . .

# ✅ Install Playwright Browsers inside Docker
RUN npx playwright install --with-deps

# ✅ Run Playwright tests when the container starts
CMD ["npx", "playwright", "test"]
