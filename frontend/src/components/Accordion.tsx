import { ChevronDownIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/useAuthContext';
import api from '../api/api';
import Modal from './Modal';
import Table from './Table';
import { stringToDate } from '../utils/ConverteStringEmDate';

interface AccordionProps {
  matriculaId: number;
  disciplina: string;
  professor: string;
}

const Accordion = ({ matriculaId, disciplina, professor }: AccordionProps) => {
  const { user } = useAuthContext();

  type typeNotas = {
    id: number;
    valorObtido: number;
    matriculaId: number;
    avaliacaoId: number;
    avaliacao: {
      id: number;
      nome: string;
      valor: number;
      data: string | Date;
      disciplinaRealizadaId: number;
    };
  };
  const [notas, setNotas] = useState<typeNotas[]>([]);

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const dados = (
          await api.get<typeNotas[]>(
            `/disciplinas-realizadas/avaliacoes/notas/matriculas/${matriculaId}`,
          )
        ).data;
        dados.forEach((dado) => {
          dado.avaliacao.data = stringToDate(dado.avaliacao.data as string);
        });
        const dadosOrdenados = dados.sort(
          (a, b) =>
            (a.avaliacao.data as Date).getTime() -
            (b.avaliacao.data as Date).getTime(),
        );
        setNotas(dadosOrdenados);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotas();
  }, [user?.id, matriculaId]);

  const valorTotal = notas.reduce(
    (acumulador, nota) => acumulador + nota.avaliacao.valor,
    0,
  );
  let valorObtido = notas.reduce(
    (acumulador, nota) => acumulador + Number(nota.valorObtido),
    0,
  );
  if (valorObtido) valorObtido = Math.round(valorObtido);

  type typePresencas = {
    id: number;
    presente: boolean;
    matriculaId: number;
    aulaId: number;
    aula: {
      id: number;
      titulo: string;
      descricao: string;
      data: Date | string;
      disciplinaRealizadaId: number;
    };
  };

  const [presencas, setPresencas] = useState<typePresencas[]>([]);

  useEffect(() => {
    const fetchPresencas = async () => {
      try {
        const dados = (
          await api.get<typePresencas[]>(
            `/disciplinas-realizadas/aulas/presencas/matriculas/${matriculaId}`,
          )
        ).data;
        dados.forEach((dado) => {
          dado.aula.data = stringToDate(dado.aula.data as string);
        });
        const dadosOrdenados = dados.sort(
          (a, b) =>
            (a.aula.data as Date).getTime() - (b.aula.data as Date).getTime(),
        );
        setPresencas(dadosOrdenados);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPresencas();
  }, [user?.id, matriculaId]);

  const total = presencas.length;
  const totalPresencas = presencas.filter((p) => p.presente).length;
  const totalFaltas = total - totalPresencas;
  const porcentagemPresenca = total > 0 ? (totalPresencas / total) * 100 : 0;
  const porcentagemFalta = total > 0 ? (totalFaltas / total) * 100 : 0;

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div className="w-5/6 md:w-3/4 lg:w-1/2 font-corpo mb-4">
      <button
        className="flex items-center justify-between w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col items-start">
          <span className="text-xl">{disciplina}</span>
          <span className="text-sm text-gray-500">Prof(a). {professor}</span>
        </div>
        <ChevronDownIcon
          className={`h-5 w-5 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="flex flex-col mt-4 gap-4">
          {!notas ||
            (notas.length === 0 && (
              <span className="text-center">Nenhuma nota lançada!</span>
            ))}
          {notas && notas.length > 0 && (
            <Table headers={['Avaliação', 'Data', 'Valor', 'Nota']}>
              {notas.map((nota) => (
                <tr
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                  key={nota.id}
                >
                  <td className="px-4 py-3 text-gray-800 font-medium">
                    {nota.avaliacao.nome}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {(nota.avaliacao.data as Date).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {nota.avaliacao.valor}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {nota.valorObtido}
                  </td>
                </tr>
              ))}
              <tr className="font-bold odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition overflow-hidden">
                <td className=" px-4 py-3">Total</td>
                <td className=" px-4 py-3"></td>
                <td className=" px-4 py-3">{valorTotal}</td>
                <td className=" px-4 py-3">{valorObtido}</td>
              </tr>
            </Table>
          )}
          <h5 className="text-center font-semibold">Presenças</h5>
          <div
            className="w-full  bg-gray-200 rounded-xl overflow-hidden h-6 flex text-xs font-semibold cursor-pointer"
            onClick={() => setIsOpenModal(true)}
          >
            {/* Parte verde (presenças) */}
            <div
              className="bg-green-500 h-full flex items-center justify-center text-white"
              style={{ width: `${porcentagemPresenca}%` }}
            >
              {porcentagemPresenca >= 15 &&
                `${Math.round(porcentagemPresenca)}%`}
            </div>

            {/* Parte vermelha (faltas) */}
            <div
              className="bg-red-500 h-full flex items-center justify-center text-white"
              style={{ width: `${porcentagemFalta}%` }}
            >
              {porcentagemFalta >= 15 && `${Math.round(porcentagemFalta)}%`}
            </div>
          </div>
          {presencas.length === 0 && (
            <span className="text-center">Nenhuma presença lançada!</span>
          )}
          {isOpenModal && presencas.length > 0 && (
            <Modal titulo="Presenças" setIsOpen={setIsOpenModal}>
              <Table headers={['Título', 'Descrição', 'Data', 'Presença']}>
                {presencas.map((presenca) => (
                  <tr
                    key={presenca.id}
                    className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {presenca.aula.titulo}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {presenca.aula.descricao}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {(presenca.aula.data as Date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-4 py-3">
                      {presenca.presente ? (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          Presente
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                          Ausente
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </Table>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default Accordion;
