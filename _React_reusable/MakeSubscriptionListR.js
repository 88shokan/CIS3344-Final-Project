"use strict";

function MakeSubscriptionListR({ 
    subList = [{ name: "Unknown Service", cost: 0, status: "Inactive" }], 
    title = "My Subscriptions", 
    color = "lightblue" 
}) {

    // Sort state
    const [sortField, setSortField] = React.useState("none"); // "none", "service", "cost"
    const [sortDirection, setSortDirection] = React.useState("asc"); // "asc" or "desc"

    function MakeSubR({
        name = "Unknown Service",
        cost = 0,
        status = "Inactive",
        color = "lightblue"
    }) {

        const [nameState, setNameState] = React.useState(name);
        const [nameInput, setNameInput] = React.useState("");

        const [costState, setCostState] = React.useState(cost);
        const [costFactorInput, setCostFactorInput] = React.useState("");

        const [statusState, setStatusState] = React.useState(status);

        function makeNum(numStr) {
            numStr += "";
            numStr = numStr.replace("$", "").replace(",", "");
            return Number(numStr);
        }

        function formatCurrency(numStr) {
            const num = makeNum(numStr);
            return num.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2
            });
        }

        function changeServiceName() {
            setNameState(nameInput);
        }

        function changeCostByFactor() {
            const n = Number(costFactorInput);
            const newCost = makeNum(costState) * (1 + n);
            setCostState(newCost);
        }

        function toggleStatus() {
            setStatusState(statusState === "Active" ? "Canceled" : "Active");
        }

        return (
            <div className="subscription">
                Service: {nameState} <br />
                Cost: {formatCurrency(costState)} / month <br />
                Status: <span className={statusState.toLowerCase()}>{statusState}</span>
                <br /><br />

                <button onClick={changeServiceName}>Change Service Name:</button>
                <input
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    placeholder="Enter new name"
                /> <br /><br />

                <button onClick={changeCostByFactor}>Change Cost by Factor:</button>
                <input
                    value={costFactorInput}
                    onChange={e => setCostFactorInput(e.target.value)}
                    placeholder="e.g. 0.1 for +10%"
                /> <br /><br />

                <button onClick={toggleStatus}>
                    Toggle Status
                </button>
                <hr />
            </div>
        );
    }

    // --- SORTING USING sortOrder.js ---
    function getSortedList() {
        if (sortField === "none") return subList;

        const sorted = [...subList].sort((a, b) => {
            let aVal, bVal, type;

            if (sortField === "service") {
                aVal = a.name || "Unknown Service";
                bVal = b.name || "Unknown Service";
                type = "TEXT";
            } else if (sortField === "cost") {
                aVal = (a.cost !== undefined && a.cost !== null) ? a.cost : 0;
                bVal = (b.cost !== undefined && b.cost !== null) ? b.cost : 0;
                type = "NUMBER";
            }

            const sa = sortOrder(aVal, type);
            const sb = sortOrder(bVal, type);

            // For TEXT type, sortOrder returns strings, so we need string comparison
            if (type === "TEXT") {
                if (sortDirection === "asc") {
                    return sa < sb ? -1 : (sa > sb ? 1 : 0);
                } else {
                    return sa > sb ? -1 : (sa < sb ? 1 : 0);
                }
            } else {
                // For NUMBER type, sortOrder returns numbers, so we can subtract
                return sortDirection === "asc" ? sa - sb : sb - sa;
            }
        });

        return sorted;
    }

    const sortedList = getSortedList();

    return (
        <div className="subscriptionList">
            <h2>{title}</h2>

            {/* SORT CONTROLS */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>

                <label style={{ color: "white", marginRight: "10px", fontWeight: "600" }}>
                    Sort Field:
                </label>
                <select
                    value={sortField}
                    onChange={e => setSortField(e.target.value)}
                    style={{
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "2px solid white",
                        background: "white",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        marginRight: "15px"
                    }}
                >
                    <option value="none">No Sort</option>
                    <option value="service">Service (A→Z)</option>
                    <option value="cost">Cost</option>
                </select>

                <label style={{ color: "white", marginRight: "10px", fontWeight: "600" }}>
                    Direction:
                </label>
                <select
                    value={sortDirection}
                    onChange={e => setSortDirection(e.target.value)}
                    style={{
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "2px solid white",
                        background: "white",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer"
                    }}
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            {sortedList.length === 0 ? (
                <p>No subscriptions found.</p>
            ) : (
                sortedList.map((sub, idx) =>
                    <MakeSubR
                        key={idx}
                        name={sub.name || "Unknown Service"}
                        cost={(sub.cost !== undefined && sub.cost !== null) ? sub.cost : 0}
                        status={sub.status || "Inactive"}
                    />
                )
            )}
        </div>
    );
}