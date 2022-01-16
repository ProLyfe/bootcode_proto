import BootCodeComponent from "../../../components/BootCodeCommponent";

const BootCodeDetailsFrame = ({ data }) => (     
    <div>
        {data ? <BootCodeComponent bootcode={data}/> : <h1>Chargement</h1>}
    </div>
);

export default BootCodeDetailsFrame;

export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params;

    const res = await fetch(`https://bootcodedevlab.herokuapp.com/publication/${id}`);
    const data = await res.json();

    return {
        props: {
            data: data
        }
    };
};

