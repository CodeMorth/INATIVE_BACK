declare namespace NodeJS {
    interface ProcessEnv {
      DB_USERNAME: string
      DB_PASSWORD: string
      DB_HOST: string
      DB_PORT: string // Debería ser string, ya que `process.env` devuelve cadenas
      DB_DATABASE: string
      PORT: string // Debería ser string
  
      CLOUD_NAME: string
      API_KEY: string // Cambia de number a string
      API_SECRET: string
  
      JWT_SECRET: string
      JWT_ALGORITHMS: string
      JWT_EXPIRESIN: string
    }
  }
  