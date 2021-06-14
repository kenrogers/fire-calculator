import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import Home from "../pages/index";

describe("Home", () => {
  it("should render the Home component", () => {
    render(<Home />);
    expect(screen.getByText("SimpleFIRE")).toBeInTheDocument();
  });

  it("should output the correct numbers with default inputs", () => {
    render(<Home />);

    fireEvent.click(screen.getByText("Make it happen"));

    expect(screen.findByText("1,500,000").toBeInTheDocument);
    expect(screen.findByText("3,412").toBeInTheDocument);

    fireEvent.change(screen.getByLabelText("Desired monthly budget"), {
      target: { value: 10000 },
    });

    fireEvent.click(screen.getByText("Make it happen"));

    expect(screen.findByText("3,000,000").toBeInTheDocument);
    expect(screen.findByText("6,711").toBeInTheDocument);
  });

  it("should output the correct numbers with changed inputs", () => {
    render(<Home />);

    fireEvent.change(screen.getByLabelText("Desired monthly budget"), {
      target: { value: 10000 },
    });
    fireEvent.change(screen.getByLabelText("Currently invested"), {
      target: { value: 15000 },
    });
    fireEvent.change(screen.getByLabelText("Current age"), {
      target: { value: 30 },
    });
    fireEvent.change(screen.getByLabelText("Desired FIRE age"), {
      target: { value: 40 },
    });

    fireEvent.click(screen.getByText("Make it happen"));

    expect(screen.findByText("3,000,000").toBeInTheDocument);
    expect(screen.findByText("14,031").toBeInTheDocument);
  });
});
