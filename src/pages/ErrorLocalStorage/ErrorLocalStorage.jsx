import Title from '../../components/Title/Title';
import './ErrorLocalStorage.scss'

const ErrorLocalStorage = () => {
  return (
    <div className='Error'>
      <div className="ErrorLocalStorage">
      <Title text={'Erreur localStorage'}/>
        <p>
          This website needs access to the localStorage, please turn it on
          and do not touch it 😉
          Please refresh your page to see the content
        </p>
        <p>
          Ce site a besoin d&apos;avoir accès à votre localStorage, merci de le rendre disponible et de ne pas y toucher 😉
          Veuillez rafraichir votre page pour accéder au contenu
        </p>
      </div>
    </div>
  )
}

export default ErrorLocalStorage
