import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchClients } from "../contentful";
import Marquee from "react-fast-marquee";
import clientStyles from "./styles/clients.module.css";

function Clients() {
    const [clients, setClients] = useState([]);

    const getClients = async () => {
        try {
            const data = await fetchClients();
            if (!data) return;

            const { items, includes } = data;
            const assets = includes?.Asset || [];

            // Process each client data
            const clientData = items.map((client) => {
                const clientLogoId = client.fields.clientLogo?.sys?.id;
                const logoAsset = assets.find(
                    (asset) => asset.sys.id === clientLogoId
                );
                const logoUrl = logoAsset
                    ? `https:${logoAsset.fields.file.url}`
                    : null;

                return {
                    id: client.sys.id,
                    name: client.fields.clientName || "Unknown Client",
                    logo: logoUrl,
                };
            });

            setClients(clientData);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };
    useEffect(() => {
        getClients();
    }, []);

    return (
        <Marquee
            speed={105}
            pauseOnHover
            gradient={false}
            direction="left"
            autoFill
            className={clientStyles.clientContainer}
        >
            <div className={clientStyles.clients}>
                {clients.length > 0 ? (
                    clients.map((client) => (
                        <Client key={client.id} client={client} />
                    ))
                ) : (
                    <p>No clients found.</p>
                )}
            </div>
        </Marquee>
    );
}

function Client({ client }) {
    return (
        <div className={clientStyles.client}>
            {client.logo ? (
                <img src={client.logo} alt={client.name} />
            ) : (
                <p>Logo not available</p>
            )}
            <p>{client.name}</p>
        </div>
    );
}

Client.propTypes = {
    client: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        logo: PropTypes.string,
    }).isRequired,
};

export default Clients;
