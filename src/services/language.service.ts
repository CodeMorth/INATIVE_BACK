import { Language } from '../models'
import { ErrorOwn } from '../utils'

export const createLanguageService = async (languageData: {
  name_language: string
}) => {
  const { name_language } = languageData

  if (!name_language) throw ErrorOwn('Faltan datos')

  try {
    // Verifica si el lenguaje ya existe en la base de datos
    const existingLanguage = await Language.findOne({
      where: { name_language }
    })

    if (existingLanguage) {
      throw ErrorOwn()
    }
  } catch (error) {
    throw ErrorOwn('El lenguaje ya existe')
  }

  try {
    // Si no existe, crea el nuevo lenguaje
    await Language.create({ name_language })

    return { message: 'Lenguaje creado correctamente' }
  } catch (error) {
    throw ErrorOwn('No se pudo crear el lenguaje')
  }
}

export const getAllLanguagesService = async () => {
  try {
    // Traer todos los lenguajes existentes
    const totalLanguage = await Language.findAll()

    return totalLanguage
  } catch (error) {
    throw ErrorOwn('No se pudieron traer todos los lenguajes')
  }
}
