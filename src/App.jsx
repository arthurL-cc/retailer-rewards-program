import { useContext } from "react";
import "./App.scss";
import TransactionContext from "./context/TransactionContext";
import CustomerRow from "./components/CustomerRow/CustomerRow";

function App() {
    const { customerIds, loading, error } = useContext(TransactionContext);

    if (loading) {
        return <div className="App">Loading...</div>;
    }

    if (error) {
        return <div className="App">Error: {error.message}</div>;
    }
    return (
        <div className="App">
            <div className="rewards-table-container">
                <div className="rewards-table-head-row">
                    <div className="rewards-table-head-row-cell">
                        customerId
                    </div>
                    <div className="rewards-table-head-row-cell">
                        totalRewards
                    </div>
                    <div className="rewards-table-head-row-cell">
                        totalAmount
                    </div>
                </div>

                {customerIds &&
                    customerIds.map((customerId, idx) => {
                        return (
                            <CustomerRow
                                key={customerId}
                                customerId={customerId}
                                idx={idx}
                            />
                        );
                    })}
            </div>
        </div>
    );
}

export default App;
