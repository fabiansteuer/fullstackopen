const Header = ({ course }) => <h1>{course.name}</h1>;

const Content = ({ course }) =>
  course.parts.map((part) => <Part key={part.id} part={part} />);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ course }) => {
  const exercises = course.parts.map((part) => part.exercises);
  return <p>{exercises.reduce((a, b) => a + b)} exercises in total</p>;
};

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </>
);

export default Course;
