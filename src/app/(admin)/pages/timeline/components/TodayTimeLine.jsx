const TodayTimeLine = ({
  timeline
}) => {
  return <div className="row">
      <div className="col-12">
        <h5 className="card-title mb-3">Left Timeline</h5>
        {Object.keys(timeline).map((day, idx) => {
        return <>
              <div className="d-flex flex-row fs-18 align-items-center mb-3">
                <h5 className="mb-0">{day}</h5>
              </div>
              <ul className="list-unstyled left-timeline">
                {timeline[day].map((item, idx) => <li className="left-timeline-list" key={idx}>
                    <div className="card d-inline-block">
                      <div className="card-body">
                        <h5 className="mt-0 fs-16">
                          {item.title}
                          <span className="badge bg-secondary ms-1 align-items-center">{item.important}</span>
                        </h5>
                        <p className="text-muted mb-0">{item.description}</p>
                      </div>
                    </div>
                  </li>)}
              </ul>
            </>;
      })}
      </div>
    </div>;
};
export default TodayTimeLine;