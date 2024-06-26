interface Props {
    children: React.ReactNode
    title: string;
}

const ContainerCard2: React.FC<Props> = (props) => {

    const { title, children } = props;

  return (
    <div className="w-full rounded-xl shadow-box bg-white py-8 px-6 md:p-8 ">
      <h2 className="text-[#F2308B] capitalize text-xl mb-8 font-semibold pb-4 border-b-2 border-gray-200 ">
        {title}
      </h2>
      <section className="">
        {children}
      </section>

    </div>
  );
};

export default ContainerCard2;
