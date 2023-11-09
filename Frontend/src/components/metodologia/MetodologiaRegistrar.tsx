// import { registerProyecto } from '../../api/metodologia/proyecto.api';

const RegistrarMetologia: React.FC = () => {

 
  const handleRegistration = async () => {

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-3xl font-bold mb-4 text-center">Registrar Metodologia</div>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="nombre de metodologia"
            //   value={codigoProyecto}
            //   onChange={(e) => setCodPro(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <button
              type="button"
              onClick={handleRegistration}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrarMetologia;
