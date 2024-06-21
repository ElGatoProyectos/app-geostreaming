interface Props {
    children: React.ReactNode
    title: string;
}

const ContainerCard2: React.FC<Props> = (props) => {

    const { title, children } = props;

  return (
    <div className="w-full rounded-xl shadow-box bg-white py-8 px-6 md:p-8 ">
      <h2 className="text-[#277FF2] capitalize text-xl mb-8 font-semibold pb-4 border-b-2 border-gray-300 ">
        {title}
      </h2>
      <section className="">
        {children}
      </section>

    </div>
  );
};

export default ContainerCard2;
