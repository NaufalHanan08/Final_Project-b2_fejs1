import CourseCard from './CourseCard';

function CourseList() {
  return (
    <div className="py-28 flex flex-col items-center px-20">
      <h1 className="text-5xl text-center font-bold overflow-hidden mb-5">
        Featured <span className="text-teal-600">Courses</span>
      </h1>
      <p className="mb-10 text-center">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi rerum similique illo laborum dolor expedita iure sunt placeat repudiandae sequi at ipsa obcaecati, consectetur consequatur eos, odio vero ducimus culpa qui saepe
        distinctio eveniet soluta. Quidem vero a ullam nam?
      </p>
      <CourseCard />
    </div>
  );
}

export default CourseList;
