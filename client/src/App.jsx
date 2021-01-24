import s from './App.module.scss'
import LoginForm from './components/LoginForm'

const App = () => {
    return (
        <div className={s.app}>
            <LoginForm/>
        </div>
    )
}

export default App
