import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface recipe_form {
  name: string;
  summary: string;
  instructions:string;
}

type params_type = Record<"id", string | undefined>;

export default function Recipe() {
  const [form, setForm] = useState<recipe_form>({
    name: "",
    summary: "",
    instructions: "",
  });
  const [isNew, setIsNew] = useState<boolean>(true);
  const params = useParams<params_type>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/recipe/${params.id?.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const recipe = await response.json();
      if (!recipe) {
        console.warn(`Recipe with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(recipe);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value: Partial<recipe_form>) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const post = { ...form };
    try {
      let response;
      if (isNew) {
        // if we are adding a new recipe we will POST to /recipe.
        response = await fetch("http://localhost:5050/recipe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        });
      } else {
        // if we are updating a recipe we will PATCH to /recipe/:id.
        response = await fetch(`http://localhost:5050/recipe/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({ name: "", summary: "", instructions: "" });
      navigate("/");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3>Create/Update Recipe Post</h3>
      <form
        onSubmit={onSubmit}
      >
        <div>
          <div>
            <h2>
              Recipe info
            </h2>
            <p>
              This is a recipe post that will be shared publicly. Please follow our user guidelines.
            </p>
          </div>

          <div >
            <div>
              <label
                htmlFor="name"
              >
                Name
              </label>
              <div>
                <div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Recipe Name"
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="summary"
              >
                Summary
              </label>
              <div>
                <div>
                  <input
                    type="text"
                    name="summary"
                    id="summary"
                    placeholder="recipe summary"
                    value={form.summary}
                    onChange={(e) => updateForm({ summary: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="instructions"
              >
                Instructions
              </label>
              <div>
                <div>
                  <input
                    type="text"
                    name="instruction"
                    id="instruction"
                    placeholder="recipe instructions"
                    value={form.instructions}
                    onChange={(e) => updateForm({ instructions: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Save Recipe"
        />
      </form>
    </>
  );
}