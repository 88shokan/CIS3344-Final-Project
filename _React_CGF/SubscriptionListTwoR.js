"use strict"; // prevent browser from auto-declaring globals

function SubscriptionListTwoR_CGF() {

    const [isLoading, setIsLoading] = React.useState(true);
    const [subList, setSubList] = React.useState([]);

    // Load JSON data once when component mounts
    React.useEffect(() => {
        ajax_alt(
            "json/subscription2.json", 
            (data) => {
                console.log("Loaded Subscriptions 2 JSON:", data);
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
        return <p>Loading Subscription List 2...</p>;
    }

    // Once loaded, render the subscription list
    return (
        <MakeSubscriptionListR
            title="Subscription List Two"
            subList={subList}
        />
    );
}