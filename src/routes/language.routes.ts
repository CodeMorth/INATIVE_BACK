import { Router } from 'express'
import { authenticate } from '../middleware/auth.midleware'
import { createLanguageController, getAllLanguagesController } from '../controllers'

export const LanguageRouter = Router()

LanguageRouter.post('/createLanguage', authenticate,createLanguageController)
LanguageRouter.get("/getAllLanguages",authenticate,getAllLanguagesController)
