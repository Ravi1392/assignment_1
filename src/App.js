import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FunctionalForm from './FunctionalForm';
import ClassForm from './ClassForm';

function App() {
  return (
    <>
      <div className="container text-center mt-5">
        <div className="row">
          <div className="col-sm-6">
            <FunctionalForm/>
          </div>
          <div className="col-sm-6">
            <ClassForm/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
