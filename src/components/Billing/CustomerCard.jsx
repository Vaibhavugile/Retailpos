import "./CustomerCard.css";
import { useEffect, useState } from "react";
import { getCustomerByMobile } from "../../services/customerService";

export default function CustomerCard({
  customer,
  setCustomer,
}) {

  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (mobile.length !== 10) {

      setCustomer({
        exists: false,
        mobile,
        name: "",
        totalOrders: 0,
        totalSpent: 0,
      });

      setName("");

      return;

    }

    const timer = setTimeout(async () => {

      try {

        setLoading(true);

        const data =
          await getCustomerByMobile(mobile);

        if (data) {

          setCustomer({

            ...data,

            exists: true,

          });

          setName(data.name);

        } else {

          setCustomer({

            exists: false,

            mobile,

            name: "",

            totalOrders: 0,

            totalSpent: 0,

          });

          setName("");

        }

      } catch (error) {

        console.error(error);

      }

      setLoading(false);

    }, 400);

    return () => clearTimeout(timer);

  }, [mobile]);

  useEffect(() => {

    setCustomer((prev) => ({

      ...prev,

      mobile,

      name,

    }));

  }, [mobile, name]);

  return (

    <div className="customer-card">

      <div className="card-header">

        <h2>👤 Customer</h2>

        {loading ? (

          <span className="customer-status">

            Searching...

          </span>

        ) : customer?.exists ? (

          <span className="customer-status success">

            ✓ Existing Customer

          </span>

        ) : mobile.length === 10 ? (

          <span className="customer-status new">

            New Customer

          </span>

        ) : null}

      </div>

      <div className="customer-body">

        <div className="form-group">

          <label>Mobile Number</label>

          <input
            type="tel"
            placeholder="Enter Mobile Number"
            maxLength={10}
            value={mobile}
            onChange={(e) =>
              setMobile(
                e.target.value.replace(/\D/g, "")
              )
            }
          />

        </div>

        <div className="form-group">

          <label>Customer Name</label>

          <input
            type="text"
            placeholder={
              mobile.length === 10
                ? "Enter Customer Name"
                : "Enter Mobile Number First"
            }
            value={name}
            readOnly={customer?.exists}
            disabled={mobile.length !== 10}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

        </div>

        <div className="customer-info">

          <div className="info-box">

            <span>Total Orders</span>

            <strong>

              {customer?.totalOrders || 0}

            </strong>

          </div>

          <div className="info-box">

            <span>Total Spent</span>

            <strong>

              ₹ {(customer?.totalSpent || 0).toFixed(2)}

            </strong>

          </div>

        </div>

      </div>

    </div>

  );

}