import useLastVisit from "../../../hook/useLastVisit";

const LastVisit = () => {

    const [lastVisit] = useLastVisit()
 
    const filteredData = lastVisit.filter(item => item.visitCount !== undefined);

    const totalVisits = lastVisit.find(item => item.key === 'visitor_count')?.totalVisits;


    return (
        <div className="mx-auto container">

            <h2 className="text-xl text-center font-bold my-4">Total Visitor :  {totalVisits}</h2>


            <div>
                <table className="table mt-6 lg:mt-0">
                    {/* head */}
                    <thead>
                        <tr className="border border-blue-300 rounded-2xl font-bold  text-xs text-white">

                            <th>Time</th>
                            <th>Ip</th>
                            <th>Count</th>
 
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {filteredData?.map(item => <tr key={item._id} className=" bg-blue-200 hover:bg-blue-300 rounded-2xl">

                            <td className="text-black font-medium">
                                {item.lastVisit}
                            </td>

                            <td className="text-black font-medium">
                                {item.ip}
                            </td>

                            <td className="text-black font-medium">
                                {item.visitCount}
                            </td>
 

                        </tr>)}
                    </tbody>




                </table>

            </div>
        </div>
    );
};

export default LastVisit;