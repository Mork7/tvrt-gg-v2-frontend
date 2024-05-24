// eslint-disable-next-line react/prop-types
const Region = ({ setRegion }) => {
  return (
    <>
      <label className="font-semibold">Region</label>
      <div className="flex justify-between space-x-4">
        <div>
          <div>
            <label htmlFor="na" className="mr-3">
              North America
            </label>
            <input
              name="region"
              type="radio"
              id="na"
              className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
              required
              value={'na'}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="euw" className="mr-3">
              Europe West
            </label>
            <input
              name="region"
              type="radio"
              id="euw"
              className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
              required
              value={'euw'}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="eune" className="mr-3">
              Europe East/Nordic
            </label>
            <input
              name="region"
              type="radio"
              id="eune"
              className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
              required
              value={'eune'}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="oce" className="mr-3">
              Oceania
            </label>
            <input
              name="region"
              type="radio"
              id="oce"
              className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
              required
              value={'oce'}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ru" className="mr-3">
              Russia
            </label>
            <input
              name="region"
              type="radio"
              id="ru"
              className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
              required
              value={'ru'}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="kr" className="mr-3">
              Korea
            </label>
            <input
              name="region"
              type="radio"
              id="kr"
              className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
              required
              value={'kr'}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="jp" className="mr-3">
              Japan
            </label>
            <input
              name="region"
              type="radio"
              id="jp"
              className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
              required
              value={'jp'}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="br" className="mr-3">
              Brazil
            </label>
            <input
              name="region"
              type="radio"
              id="br"
              className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
              required
              value={'br'}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lan" className="mr-3">
              Latin America North
            </label>
            <input
              name="region"
              type="radio"
              id="lan"
              className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
              required
              value={'lan'}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="vn" className="mr-3">
              Vietnam
            </label>
            <input
              name="region"
              type="radio"
              id="vn"
              className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
              required
              value={'vn'}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="th" className="mr-3">
              Thailand
            </label>
            <input
              name="region"
              type="radio"
              id="th"
              className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
              required
              value={'th'}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="tw" className="mr-3">
              Taiwan
            </label>
            <input
              name="region"
              type="radio"
              id="tw"
              className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
              required
              value={'tw'}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Region;
