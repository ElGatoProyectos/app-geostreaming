interface ActionButtonProps {
    onClick: () => void;
    children: React.ReactNode
  }

const ActionButton: React.FC<ActionButtonProps> = ({onClick, children}) => {
  return (
    <button
      onClick={onClick}
      className="text-sm bg-[#F2308B] text-white capitalize whitespace-nowrap hover:bg-[#F06FAC] p-2 rounded"
    >
      {children}
    </button>
  )
}

export default ActionButton
