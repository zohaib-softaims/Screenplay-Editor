export default function Element({ attributes, children, element }: any) {
    const common = {
      ...attributes,
      className: "font-mono text-[12pt] whitespace-pre-wrap",
    };
  
    switch (element.type) {
      case "scene_heading":
        return (
          <h3
            {...common}
            className="uppercase font-bold ml-24 mt-10 mb-10 text-left"
          >
            {children}
          </h3>
        );
  
      case "action":
        return (
          <p {...common} className="ml-24 text-left">
            {children}
          </p>
        );
  
      case "character":
        return (
          <p
            {...common}
            className="uppercase text-center mx-40"
          >
            {children}
          </p>
        );
  
      case "dialogue":
        return (
          <p
            {...common}
            className="text-center mx-40"
          >
            {children}
          </p>
        );
  
      default:
        return <p {...attributes}>{children}</p>;
    }
  }
  