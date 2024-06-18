interface ActionButtonProps {
    onClick: () => void;
    children: React.ReactNode
  }

const ActionButton: React.FC<ActionButtonProps> = ({onClick, children}) => {
  return (
    <button
      onClick={onClick}
      className="text-sm bg-[#277FF2] text-white capitalize whitespace-nowrap hover:bg-[#4E98F9] p-2 rounded"
    >
      {children}
    </button>
  )
}

export default ActionButton
