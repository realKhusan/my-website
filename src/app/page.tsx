import { myData } from "@/constants/data";
import { socialLink } from "@/constants/data";
export default function Hello() {
  return (
    <div className="container grid grid-cols-1 lg:grid-cols-2 items-center h-full">
      <div>
        <div className="mb-7">
          <h5 className="mb-2 text-white">Hi all . I am</h5>
          <h1 className="text-5xl mb-2 text-white">
            {myData.fullName.firstName} {myData.fullName.lastName}
          </h1>
          <h2 className="text-main text-3xl">{">"} Front-end developer</h2>
        </div>

        {data.map((item) => {
          return (
            <div key={item.key} className="mb-2">
              <p className="text-white/50">
                {"// "}
                {item.commit}
              </p>
              <p>
                <span className="text-purple-400">const</span>{" "}
                <span className="text-teal-500">{item.variableName}</span> ={" "}
                <span className="text-amber-600">{` "${item.value}"`}</span>
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center h-full"></div>
    </div>
  );
}

const data = [
  {
    key: "myNumber",
    commit: "my nummber",
    variableName: "telephoneNum",
    value: myData.phone.number,
  },
  {
    key: "email",
    commit: "my email",
    variableName: "email",
    value: myData.email,
  },
  {
    key: "githubLink",
    commit: "you can also see it on my github page",
    variableName: "githubLink",
    value: socialLink.github.url,
  },
  {
    key: "linkedin",
    commit: "you can  check may Linkedin page",
    variableName: "linkedin",
    value: socialLink.linkedin.url,
  },
  {
    key: "telegram",
    commit: "you can message me",
    variableName: "telegram",
    value: socialLink.telegram.url,
  },
];
