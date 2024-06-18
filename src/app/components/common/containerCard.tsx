interface Product {
    isNew: boolean;
    title: string;
    url: string;
    description: string;
    consumer_price?: string;
    distributors_price?: string;
  }
interface Props {
    children: React.ReactNode
    title: string;
}

const ContainerCard: React.FC<Props> = (props) => {

    const { title, children } = props;

  return (
    <div className="w-full rounded-xl shadow-box bg-white py-8 px-6 md:p-8">
      <h2 className="text-[#277FF2] capitalize text-xl mb-8 font-semibold">
        {title}
      </h2>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-center items-start gap-8 lg:gap-12 2xl:gap-16">
        {children}
      </section>

    </div>
  );
};

export default ContainerCard;
