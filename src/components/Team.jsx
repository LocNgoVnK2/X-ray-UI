import React from "react";
export const Team = (props) => {
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 section-title">
            <h2>Thành viên nhóm</h2>
            <p>
              PetPal là một công ty công nghệ đổi mới hàng đầu, chuyên tập trung vào phát triển các giải pháp thông minh để nâng cao chất lượng cuộc sống.
            </p>
          </div>
        </div>
        <div className="row" >
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4 col-sm-6 team" >
                  <div className="thumbnail">
                    <img src={d.img} alt="..." className="team-img" />
                    <div className="caption">
                      <h4>{d.name}</h4>
                      <p>{d.job}</p>
                    </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
