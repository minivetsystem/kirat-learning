

const TeamCard = ({ member }) => {
 

    return (
      <div
        className="w-full pr-12 md:mb-0 mb-8 mx-auto"
      >
    
        <div className="relative rounded-2xl overflow-hidden bg-gray-300 flex items-center justify-center">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 bg-white rounded-br-lg px-2 py-1">
            <span className="text-blue-600 font-bold text-xl">in</span>
          </div>
        </div>
        <h3 className="font-extrabold text-lg mt-6">{member.name}</h3>
        <p className="text-sm text-secondary-gray">{member.title}</p>
      </div>
    );
  };

  export default TeamCard