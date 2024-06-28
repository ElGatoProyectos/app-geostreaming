interface Props {
    children: React.ReactNode
    title: string;
}

const ContainerCard: React.FC<Props> = (props) => {

    const { title, children } = props;

  return (
    <div className="w-full rounded-xl shadow-box bg-white py-8 px-6 md:p-8">
      <h2 className="text-[#F2308B] capitalize text-xl mb-8 font-semibold">
        {title}
      </h2>
     {/*  <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4  justify-center items-start gap-8 lg:gap-12 2xl:gap-16"> */}
     <section className="flex flex-wrap justify-center items-start gap-8 lg:gap-12 2xl:gap-16">
        {children}
      </section>

    </div>
  );
};

export default ContainerCard;
