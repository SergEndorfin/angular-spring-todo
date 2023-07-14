package click.itkon.todo.todobackend.model;

public class AuthBean {

    private String message;

    public AuthBean(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
