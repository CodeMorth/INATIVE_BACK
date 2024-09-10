export declare namespace NodeJS {
  interface ProcessEnv {
    // Data Base
    DB_USERNAME: string
    DB_PASSWORD: string
    DB_HOST: string
    DB_PORT: string
    DB_DATABASE: string

    //Token
    JWT_SECRET: string
    JWT_ALGORITHMS: string
    JWT_EXPIRESIN: string

    //Cloudinary

    CLOUD_NAME: string
    API_KEY: string
    API_SECRET: string

    //Send Mailer
    GMAIL_DATO: string
    GMAIL_USER: string
    GMAIL_PASSWORD: string
  }
}
