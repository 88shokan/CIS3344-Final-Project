"use strict"; // prevent browser from auto-declaring globals

function SubscriptionListOneR_CGF() {

    const [isLoading, setIsLoading] = React.useState(true);
    const [subList, setSubList] = React.useState([]);

    // Load JSON data once when component mounts
    React.useEffect(() => {
        ajax_alt(
            "json/subscription1.json", 
            (data) => {
                console.log("Loaded Subscriptions 1 JSON:", data);
                setSubList(data.subscriptions);
                setIsLoading(false);
            },
            (error) => {
                console.error("Failed to load subscriptions:", error);
                setIsLoading(false);
            }
        );
    }, []);

    // While loading, show a simple message
    if (isLoading) {
        return <p>Loading Subscription List 1...</p>;
    }

    // Once loaded, render the subscription list
    return (
        <MakeSubscriptionListR
            title="Subscription List One"
            subList={subList}
        />
    );
}