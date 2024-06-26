import { TbMoodSadFilled } from "react-icons/tb";

interface Props {
    title: string;
}

const noRecords:React.FC<Props> = (props) => {
  return (
    <div>
      <div className="uppercase text-xl text-[#277FF2] py-4 border-b text-center">
        <h2>Historial de {props.title}</h2>
      </div>
      <div className="pt-12 text-center text-[#F2308B]">
        <span className="text-2xl ">Aún no tienes registros</span>
        <TbMoodSadFilled className="mx-auto text-8xl mt-8" />
      </div>
    </div>
  )
}

export default noRecords
