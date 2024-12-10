

const Slide = ({image}) => {
  return (
    
        <div
      className=' bg-cover w-full h-[200px] md:h-[38rem]'
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      
    </div>
  )
}

export default Slide