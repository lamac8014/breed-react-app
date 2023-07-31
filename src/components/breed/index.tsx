import { useEffect, useState } from "react";
import { useLazyGetAllBreedQuery } from "../../redux/breedAPI";
import { toast } from "react-toastify";
import { IBreed } from "../../redux/types";
import { DebounceInput } from "react-debounce-input";
import { Input } from "reactstrap";
import GridTable from "../Table";
import { Form } from "reactstrap";

const BreedList = ({}) => {
  const [breedName, setBreedName] = useState("");
  const [getAllBreed, { data: resultData }] = useLazyGetAllBreedQuery();

  const column = [
    {
      width: "20%",
      Header: "Id",
      accessor: "id",
      id: "0",
    },
    {
      width: "20%",
      Header: "Name",
      accessor: "name",
      id: "1",
    },
    {
      width: "20%",
      Header: "Life Span",
      accessor: "life_span",
      id: "2",
    },

    {
      width: "20%",
      Header: "Height Imperial",
      accessor: "height.imperial",
      id: "3",
    },

    {
      width: "20%",
      Header: "Height Metric",
      accessor: "height.metric",
      id: "4",
    },
  ];

  useEffect(() => {
    getAllBreed({ nameParam: breedName });
  }, [breedName]);

  return (
    <>
      <Form>
        <div>
          <div>
            <DebounceInput
              placeholder={"Enter Breed Name..."}
              value={breedName}
              debounceTimeout={1000}
              onChange={(e) => setBreedName(e.target.value)}
            />
          </div>
          <div>
            {/* <table>
            <thead>
              <tr>
                <td>
                  Name
                </td>
                <td>
                  Life Span
                </td>

              </tr>
            </thead>
            <tbody>
              {data && data.map((item) => (
                <tr key={item.id}>

                  <td>{item.name}</td>
                  <td>{item.life_span}</td>

                </tr>
              ))}
            </tbody>
          </table> */}

            <GridTable data={resultData ? resultData : []} headers={column} />
          </div>
        </div>
      </Form>
    </>
  );
};

export default BreedList;
