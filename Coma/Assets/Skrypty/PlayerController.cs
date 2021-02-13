using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float speed; // prędkość poruszania się
    public float jumpforce; // siła skoku
    public float moveInput; // poruszanie się w prawo lub w lewo

    private Rigidbody2D rb; 

    private bool facingRight = true;

    private bool isGrounded;
    public Transform groundCheck;
    public float checkRadius;
    public LayerMask whatIsGround;

    private int Jumps;

    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
    }

    void FixedUpdate()
    {

        isGrounded = Physics2D.OverlapCircle(groundCheck.position, checkRadius, whatIsGround);

        moveInput = Input.GetAxis("Horizontal");
        rb.velocity = new Vector2(moveInput * speed, rb.velocity.y);

        if(facingRight == false && moveInput > 0)
        {
            Flip();
        } 
        else if(facingRight == true && moveInput < 0)
        {
            Flip();
        }
    }

    void Update()
    {
        if(isGrounded == true)
        {
            Jumps = 1;
        }

        if(Input.GetKeyDown(KeyCode.Space) && Jumps > 0 && isGrounded == true)
        {
            rb.velocity = Vector2.up * jumpforce;
            Jumps--;
        }
    }

    void Flip() // obracanie postaci w prawo lub w lewo
    {
        facingRight = !facingRight;
        Vector3 Scaler = transform.localScale;
        Scaler.x *= -1;
        transform.localScale = Scaler;
    }
}
